import { useState } from 'react';
import styles from './Formulario.module.css'
import { getAddressFromAPI } from '../services/apiService';
import { formatCPF, formatRG } from '../services/formattCPF_RG';


export function Formulario() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
  });
  const [cepInvalido, setCepInvalido] = useState(false);
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  
  
  const getAdress = async (cep: string) => {
    try {
      const addressData = await getAddressFromAPI(cep);
      setEndereco(addressData);
      setCepInvalido(false);
    } catch (error) {
      setCepInvalido(true);
      alert('CEP Inválido');
    }
  };
  
  const handleBlur = () => {
    getAdress(cep);
  };

  const handleTabPress = (event: { key: string; }) => {
    if (event.key === 'tab') {      
      getAdress(cep)
    }
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(event.target.value);
    setCpf(formattedCPF);
  };

  const handleRgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedRG = formatRG(event.target.value);
    setRg(formattedRG);
  };


 const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();


    if (!cepInvalido) {
      window.location.reload();
    } else {
      alert('Por favor, insira um CEP válido antes de enviar o formulário.');
    }
  };
  

  return (
    <form method='post' onSubmit={handleSubmit}>
      <div className={styles.container}>
        <h2>Preencha o formulário</h2>

        <label>Nome:</label>
        <input type="text" required/>

        <label>Email:</label>
        <input type="email" required/>

        <label>Idade:</label>
        <input type="number"
        maxLength={3}
        required
        />

        <label>CPF:</label>
        <input type="text"
        minLength={14}
        maxLength={14}
        value={cpf}
        onChange={handleCpfChange}
        placeholder='Ex: 000.000.000-00' 
        required/>

        <label>RG:</label>
        <input
        type="text"
        min={9}
        maxLength={12}
        value={rg}
        onChange={handleRgChange}
        placeholder='Ex: 00.000.000'
        required/>
        
        <div className={styles.radioGroup}> Sexo:
          <label htmlFor="masculino">Masculino:</label>
          <input name='sexo' type="radio" id="masculino" value="masculino" required/>

          <label htmlFor="feminino">Feminino:</label>
          <input name='sexo' type="radio" id="feminino" value="feminino" required/>
        </div>

        <h3>Endereço:</h3>
        <label>CEP:</label>
        <input type="number"
         value={cep}
         onChange={(e) => setCep(e.target.value)}
         onKeyDown={handleTabPress}
         onBlur={handleBlur}
         />

        <label>Estado:</label>
        <input type="text" value={endereco.estado} readOnly />

        <label>Cidade:</label>
        <input type="text" value={endereco.cidade} readOnly />

        <label>Bairro:</label>
        <input type="text" value={endereco.bairro} readOnly />

        <label>Rua:</label>        
        <input type="text" value={endereco.rua} readOnly />

        <label>Número:</label>        
        <input type="number" />

        <label>Complemento:</label>        
        <input type="text" />
        
        <label>Mensagem:</label>
        <textarea rows={4}></textarea>

        <button type="submit">Enviar</button>
      </div>
    </form>
  )
}

export default Formulario