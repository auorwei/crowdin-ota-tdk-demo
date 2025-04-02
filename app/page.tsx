import TranslationDemo from "./components/TranslationDemo";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Crowdin OTA 演示</h1>
      <TranslationDemo />
    </div>
  );
}
