import {
  FC,
  useState,
  useContext,
  useCallback,
  createContext,
  SetStateAction,
  PropsWithChildren,
} from 'react';

type SubscriptionState = 'active' | 'complete';
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
  billing: Billing;
  stepNumber: number;
  userInputs: UserInputs;
  subscriptionState: SubscriptionState;
};

const initState: InitState = {
  addons: [],
  stepNumber: 1,
  billing: 'monthly',
  subscriptionState: 'active',
  planInfo: { type: '', price: 0 },
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
  resetSubscription: () => {},
  setSubcriptionState: () => {},
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
  const [addons, setAddons] = useState(initState.addons);
  const [billing, setBilling] = useState(initState.billing);
  const [planInfo, setPlanInfo] = useState(initState.planInfo);
  const [stepNumber, setStepNumber] = useState(initState.stepNumber);
  const [userInputs, setUserInputs] = useState(initState.userInputs);
  const [subscriptionState, setsubscriptionState] = useState(initState.subscriptionState);

  const setSubcriptionState = useCallback(
    (subscriptionState: SetStateAction<SubscriptionState>) =>
      setsubscriptionState(subscriptionState),
    [],
  );

  const setBillingPlan = useCallback(
    (billing: SetStateAction<Billing>) => setBilling(billing),
    [],
  );

  const setFormStepNumber = useCallback(
    (step: SetStateAction<number>) => setStepNumber(step),
    [],
  );

  const setUserValues = useCallback(
    (userInputs: SetStateAction<UserInputs>) => setUserInputs(userInputs),
    [],
  );

  const setSelectedPlan = useCallback(
    (plan: SetStateAction<Plan>) => setPlanInfo(plan),
    [],
  );

  const setPlanAddon = useCallback(
    (addon: SetStateAction<Addon[]>) => setAddons(addon),
    [],
  );

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
    setsubscriptionState('active');
    setPlanInfo({ type: '', price: 0 });
    setUserInputs({ name: '', email: '', phone: '', cc: '' });
  }, []);

  const state = {
    subscriptionState,
    userInputs,
    stepNumber,
    planInfo,
    billing,
    addons,
  };
  return {
    state,
    setPlanAddon,
    setUserValues,
    setBillingPlan,
    billingSwitcher,
    setSelectedPlan,
    setFormStepNumber,
    resetSubscription,
    setSubcriptionState,
  };
};

export const useSubscription = () => useContext(UIContext);
