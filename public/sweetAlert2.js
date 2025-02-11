// Function to show an error alert using SweetAlert2
export const showError = (message) => {
  // eslint-disable-next-line no-undef
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    confirmButtonText: 'OK',
    background: '#1e293b',
    color: '#fff',
    confirmButtonColor: '#3b82f6'
  });
};
