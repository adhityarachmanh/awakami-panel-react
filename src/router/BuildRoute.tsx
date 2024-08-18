const buildRoute = (route: any) => {
  const { GuardComponent, element, ...rest } = route;
  return {
    ...rest,
    element: GuardComponent ? (
      <GuardComponent>{element}</GuardComponent>
    ) : (
      element
    ),
  };
};

export default buildRoute;
