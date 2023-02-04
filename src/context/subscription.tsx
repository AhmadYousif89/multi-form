import {
  FC,
  useState,
  useContext,
  useCallback,
  createContext,
  PropsWithChildren,
  SetStateAction,
} from 'react';

export type UserInfo = Record<InputTypes, string>;
export type UserInfoValidity = Record<InputTypes, boolean>;
export type InputTypes = 'name' | 'email' | 'phoneNumber';

export type Billing = 'yearly' | 'monthly';
export type PlanTypes = 'Arcade' | 'Advanced' | 'Pro' | '';
type Plan = { type: PlanTypes; price: number };

export type AddonTypes = 'Online service' | 'Large storage' | 'Customizable profile';
type Addon =
  | { type: 'Online service'; price: number }
  | { type: 'Large storage' | 'Customizable profile'; price: number };

type InitState = {
  planInfo: Plan;
  addons: Addon[];
  userInfo: UserInfo;
  isCompleted: boolean;
  stepNumber: number;
  billing: Billing;
};

const initState: InitState = {
  isCompleted: false,
  stepNumber: 1,
  billing: 'monthly',
  planInfo: { type: '', price: 0 },
  addons: [],
  userInfo: { name: '', email: '', phoneNumber: '' },
};

const initContextState: UseSubscriptionContext = {
  state: initState,
  setPlanAddon: () => {},
  setUserValues: () => {},
  setBillingPlan: () => {},
  billingSwitcher: () => {},
  setSelectedPlan: () => {},
  setFormStepNumber: () => {},
  setFormIsCompleted: () => {},
  resetSubscription: () => {},
};

const UIContext = createContext<UseSubscriptionContext>(initContextState);

export const SubscriptionProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <UIContext.Provider value={useSubscriptionContext(initState)}>
      {children}
    </UIContext.Provider>
  );
};

type UseSubscriptionContext = ReturnType<typeof useSubscriptionContext>;
const useSubscriptionContext = (initState: InitState) => {
  const [stepNumber, setStepNumber] = useState(initState.stepNumber);
  const [addons, setAddons] = useState(initState.addons);
  const [billing, setBilling] = useState(initState.billing);
  const [planInfo, setPlanInfo] = useState(initState.planInfo);
  const [userInfo, setUserInfo] = useState(initState.userInfo);
  const [isCompleted, setIsCompleted] = useState(initState.isCompleted);

  const setFormIsCompleted = useCallback(
    (isCompleted: boolean) => setIsCompleted(isCompleted),
    [],
  );

  const setBillingPlan = useCallback(
    (billing: SetStateAction<Billing>) => setBilling(billing),
    [],
  );

  const setFormStepNumber = useCallback(
    (step: SetStateAction<number> | number) => setStepNumber(step),
    [],
  );

  const setUserValues = useCallback(
    ({ type, value }: { type: InputTypes; value: string }) =>
      setUserInfo(userInfo => ({
        ...userInfo,
        [type]: value,
      })),
    [],
  );

  const setSelectedPlan = useCallback((plan: Plan | SetStateAction<Plan>) => {
    if (typeof plan === 'object') {
      const { type, price } = plan;
      setPlanInfo(pv => (pv.type === type ? { type: '', price: 0 } : { type, price }));
    } else setPlanInfo(plan);
  }, []);

  const setPlanAddon = useCallback((addon: Addon | SetStateAction<Addon[]>) => {
    if (typeof addon === 'object' && !Array.isArray(addon)) {
      const { type, price } = addon;
      setAddons(prevAddons => {
        const exAddon = prevAddons.find(addon => addon.type === type);
        if (exAddon) return prevAddons.filter(addon => addon.type !== exAddon.type);
        return [...prevAddons, { type, price }];
      });
    } else setAddons(addon);
  }, []);

  const billingSwitcher = useCallback(() => {
    let HIGHEST_IN_MO;
    let LOWEST_IN_YR;
    setBillingPlan(billing === 'monthly' ? 'yearly' : 'monthly');
    setPlanAddon(pv => {
      return pv.map(addon => {
        const { type, price } = addon;
        HIGHEST_IN_MO = billing === 'monthly' && Math.max(price);
        LOWEST_IN_YR = billing === 'yearly' && Math.min(price);
        if (billing === 'monthly')
          return { type, price: price <= HIGHEST_IN_MO ? price * 10 : price };
        if (billing === 'yearly')
          return { type, price: price >= LOWEST_IN_YR ? price / 10 : price };
        return { ...addon };
      });
    });
    setSelectedPlan(pvPlan => {
      const { type, price } = pvPlan;
      HIGHEST_IN_MO = billing === 'monthly' && Math.max(price);
      LOWEST_IN_YR = billing === 'yearly' && Math.min(price);
      if (billing === 'monthly')
        return { type, price: price <= HIGHEST_IN_MO ? price * 10 : price };
      if (billing === 'yearly')
        return { type, price: price >= LOWEST_IN_YR ? price / 10 : price };
      return { ...pvPlan };
    });
  }, [billing]);

  const resetSubscription = useCallback(() => {
    setAddons([]);
    setStepNumber(1);
    setBilling('monthly');
    setIsCompleted(false);
    setPlanInfo({ type: '', price: 0 });
    setUserInfo({ name: '', email: '', phoneNumber: '' });
  }, []);

  const state = {
    isCompleted,
    stepNumber,
    userInfo,
    billing,
    addons,
    planInfo,
  };
  return {
    state,
    setPlanAddon,
    setUserValues,
    setBillingPlan,
    billingSwitcher,
    setSelectedPlan,
    setFormStepNumber,
    setFormIsCompleted,
    resetSubscription,
  };
};

export const useSubscription = () => useContext(UIContext);
