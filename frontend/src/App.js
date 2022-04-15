import { Balance } from './components/Balance';
import Header from './components/Header';
import TransactionsList from './components/TransactionsList';
import IncomeExpenses from './components/IncomeExpenses';
import AddTransaction from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalProvider';

function App() {
  return (
    <GlobalProvider>
      <div className="container">
      <Header />
      <Balance />
      <IncomeExpenses />
      <AddTransaction />
      <TransactionsList />
      </div>
    </GlobalProvider>
  );
}

export default App;
