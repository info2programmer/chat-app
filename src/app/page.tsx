import Button from "@/components/ui/Button";

export default async function Home() {
  return (
    <>
      <div className="text-center m-2 ">
        <Button isLoadading={false} variant="default">
          Check Button
        </Button>
      </div>
    </>
  );
}
