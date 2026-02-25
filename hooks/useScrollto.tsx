export const useScrollTo = () => {
  return (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
};
