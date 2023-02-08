import {
  FC,
  useState,
  useContext,
  useCallback,
  createContext,
  SetStateAction,
  PropsWithChildren,
} from 'react';

export type InputNames = 'name' | 'email' | 'phone' | 'cc';
export type UserInputsValidity = Record<InputNames, boolean>;
type UserInputs = Record<InputNames, string>;

export type Billing = 'yearly' | 'monthly';
export type PlanTypes = 'Arcade' | 'Advanced' | 'Pro' | '';
type Plan = { type: PlanTypes; price: number };

export type AddonTypes = 'Online service' | 'Large storage' | 'Customizable profile';
type Addon = { type: AddonTypes; price: number };

type InitState = {
  planInfo: Plan;
  addons: Addon[];
  userInputs: UserInputs;
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
  userInputs: { name: '', email: '', phone: '', cc: '' },
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
  const [userInputs, setUserInputs] = useState(initState.userInputs);
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
    (userInputs: UserInputs | SetStateAction<UserInputs>) => {
      setUserInputs(userInputs);
    },
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
    setUserInputs({ name: '', email: '', phone: '', cc: '' });
  }, []);

  const state = {
    isCompleted,
    stepNumber,
    userInputs,
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
