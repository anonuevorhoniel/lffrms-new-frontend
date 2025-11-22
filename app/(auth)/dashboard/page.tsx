import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <>
      <title>LFFRMS | Dashboard</title>
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="grid grid-cols-4 gap-5">
        <Card className="px-6 py-4 hover:-translate-y-2 transition-all shadow-lg hover:border-primary">
          <div className="space-y-3">
            <h3 className="text-sm opacity-70 ">Farmers </h3>
            <h1 className="font-bold text-2xl">1</h1>
          </div>
        </Card>
        <Card className="px-6 py-2 hover:-translate-y-2 transition-all shadow-lg hover:border-primary">
          <div className="space-y-3">
            <h3 className="text-sm opacity-70 ">Assistances Given  </h3>
            <h1 className="font-bold text-2xl">1</h1>
          </div>
        </Card>
        
      </div>
    </>
  );
}
