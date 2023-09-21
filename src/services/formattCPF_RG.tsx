export function formatCPF(cpf: string) {

  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  return cpf;
}

export function formatRG(rg: string) {
  rg = rg.replace(/\D/g, '');

  if (rg.length === 7) {
    rg = rg.replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3');
  }
  else if (rg.length === 8) {
    rg = rg.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
  }
  else if (rg.length === 9) {
    rg = rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  }

  return rg;
}