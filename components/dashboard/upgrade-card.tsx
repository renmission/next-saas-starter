import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UpgradeCard() {
  return (
    <Card className="mx-auto md:max-w-md">
      <CardHeader>
        <CardTitle>Free Plan</CardTitle>
        <CardDescription>
          You`re currently on the free plan. Upgrade to unlock more features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button size="lg" className="w-full">
          <Link href="/pricing">Upgrade to Pro</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
