import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type ClientInvitationEmailProps = {
  inviterName: string;
  businessName: string;
  clientName: string;
  invitationUrl: string;
};

// TODO: Replace this with your actual logo URL when deploying to production
const logoUrl = "https://placehold.co/150x50?text=TrustNV";

export default function ClientInvitationEmail({
  inviterName = "John Doe",
  businessName = "Trust NV",
  clientName = "Ren",
  invitationUrl = "https://localhost:3000/register",
}: ClientInvitationEmailProps) {
  const currentYear = new Date().getFullYear();
  return (
    <Html>
      <Head />
      <Preview>
        You`ve been invited to join {businessName} on our platform
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="p5 mx-auto">
            <Section className="mt-8 text-center">
              <Img
                src={logoUrl}
                width="150"
                height="50"
                alt="TrustNV Logo"
                className="mx-auto"
              />
            </Section>
            <Text className="text-xl">Hello {clientName},</Text>
            <Text>
              You&#39;ve been invited by {inviterName} to join {businessName} to
              manage your trust.
            </Text>
            <Section className="mt-8 text-center">
              <Button
                className="rounded bg-blue-600 px-4 py-3 font-bold text-white"
                href={invitationUrl}
              >
                Accept Invitation
              </Button>
            </Section>
            <Text className="mt-8 text-sm text-gray-500">
              If you didn&#39;t expect this invitation, you can safely ignore
              this email.
            </Text>
            <Hr className="my-4 border-gray-300" />
            <Text className="text-center text-xs text-gray-500">
              © {currentYear} Trust NV. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
