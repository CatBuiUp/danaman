import { prisma } from "@/lib/prisma";

type SupportedResource = "stories" | "experiences" | "opportunities";
type PrismaDelegateName = "story" | "experience" | "opportunity";

type PrismaDelegate = {
  findMany: () => Promise<unknown[]>;
  create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
};

const RESOURCE_TO_DELEGATE: Record<SupportedResource, PrismaDelegateName> = {
  stories: "story",
  experiences: "experience",
  opportunities: "opportunity",
};

function getDelegate(resource: SupportedResource): PrismaDelegate {
  const delegateName = RESOURCE_TO_DELEGATE[resource];
  const delegate = ((prisma as unknown) as Record<string, unknown>)[delegateName] as
    | PrismaDelegate
    | undefined;

  if (!delegate?.findMany || !delegate?.create) {
    throw new Error(
      `Prisma model "${resource}" is not available. Define it in schema.prisma and run prisma generate.`,
    );
  }

  return delegate;
}

export async function listResources(resource: SupportedResource) {
  const delegate = getDelegate(resource);
  return delegate.findMany();
}

export async function createResource(
  resource: SupportedResource,
  payload: Record<string, unknown>,
) {
  const delegate = getDelegate(resource);
  return delegate.create({ data: payload });
}
