type Emit = (event: "closeModal", ...args: unknown[]) => void;

export const useCloseModal = (emit: Emit) => {
  const closeModal = () => emit("closeModal");
  return { closeModal };
};
