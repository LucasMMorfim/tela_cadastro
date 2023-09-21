export async function getAddressFromAPI(cep: any) {
  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.erro) {
      return {
        estado: data.uf,
        cidade: data.localidade,
        bairro: data.bairro,
        rua: data.logradouro,
      };
    } else {
      throw new Error('CEP não encontrado');
    }
  } catch (error) {
    throw new Error('Erro ao buscar CEP');
  }
}