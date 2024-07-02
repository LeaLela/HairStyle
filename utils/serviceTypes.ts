export enum ServiceTypes {
  hair_color = "Hair Color",
  hair_cut = "Hair Cut",
  hair_cut_color = "Hair Cut & Color",
}
export const getServiceOptions = () => {
  return Object.keys(ServiceTypes).map((key) => {
    return {
      label: ServiceTypes[key as keyof typeof ServiceTypes],
      value: key,
    };
  });
};
