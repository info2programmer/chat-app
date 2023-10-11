import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <div className="text-center m-2 ">
        <Button isLoadading={false} className="rounded-full ">
          Check Button
        </Button>
      </div>
    </>
  );
}
