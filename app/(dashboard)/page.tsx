import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import SadFace from "@/components/icons/SadFace";
import { Frown } from "lucide-react";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import CollectionCard from "@/components/CollectionCard";
import { Collection, Task } from "@prisma/client";
export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMessageFallback />}>
        <WelcomeMessage />
      </Suspense>
      <Suspense fallback={<div>Loading Collections...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomeMessage() {
  const user = await currentUser();

  if (!user) {
    return <div>Error!</div>;
  }
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome,
        <br /> {user.firstName} , {user.lastName}
      </h1>
    </div>
  );
}

function WelcomeMessageFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
}
interface col {
  collection: Collection & {
    tasks: Task[];
  };
}
async function CollectionList() {
  const user = await currentUser();
  const collection = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collection.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <Frown />
          <AlertTitle>There are no collections here</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }

  return (
    <>
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 mt-6">
        {collection.map((collectionn) => (
          <CollectionCard key={collectionn.id} collection={collectionn} />
        ))}
      </div>
    </>
  );
}
