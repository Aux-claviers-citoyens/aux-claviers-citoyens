const toast = useToast()

export const toastError = (description: string) => {
  toast.add({
    title: 'Erreur',
    description: description,
    icon: 'i-heroicons-check-circle',
    color: 'error',
  })
}

export const toastSuccess = (description: string) => {
  toast.add({
    title: 'Succès',
    description: description,
    icon: 'i-heroicons-check-circle',
  })
}
