import VantaBackground from "../components/vantabackground";

export default function Home() {
  return (
    <VantaBackground>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl font-bold text-white mb-4">Lucio Ruben Villena</h1>
        <p className="text-lg text-gray-300">A passionate developer</p>
      </div>
    </VantaBackground>
  );
}
