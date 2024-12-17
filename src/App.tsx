import CurrencyConverter from "@/modules/CurrencyConverter/CurrencyConverter";

function App() {
  return (
    <main className="flex flex-col items-center h-screen">
      <div className="flex flex-col items-center gap-y-4 mt-24 lg:mt-48">
        <CurrencyConverter />
      </div>
    </main>
  );
}

export default App;
