import { useState } from 'react';
import gitLogo from '../assets/icons8-github-96.png'
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { ItemContainer } from '../components/ItemRepo/styles';
import { Container } from './styles';
import Button from '../components/Button';
import { api } from '../services/api';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`);

    if(data.id) {

      const isExist = repos.find(repo => repo.id === data.id);

      if(!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return
      } 
      alert('O repositório já está na lista ou não foi encontrado.');
      
    }
  }

  const handleRemoveRepo = (id) => {
      setRepos(repos.filter(repo => repo.id !== id));
  }
  
     
    
  

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt='github logo' />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
      <ItemContainer />
    </Container>
  );
}

export default App;