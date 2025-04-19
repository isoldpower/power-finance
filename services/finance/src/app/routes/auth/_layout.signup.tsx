import { createFileRoute } from '@tanstack/react-router'
import { SignupPage } from "@src/pages/auth";

export const Route = createFileRoute('/auth/_layout/signup')({
  component: SignupPage,
})
