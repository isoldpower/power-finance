export { AuthGuard } from './guard/auth-guard.tsx';
export { GuestGuard } from './guard/guest-guard.tsx';
export { NavigateToRecovery } from './navigate/NavigateToRecovery.tsx';
export { NavigateToSignIn } from './navigate/NavigateToSignIn.tsx'
export { AuthProvider } from './auth-provider/AuthProvider.tsx';
export { ClerkProvider, useIsClerkProvided } from './auth-provider/ClerkProvider.tsx';
export * as clerk from '@clerk/clerk-react';
export * as types from '@clerk/types';
export * as themes from '@clerk/themes';

export type { AuthGuardProps } from './guard/auth-guard.tsx';
export type { GuestGuardProps } from './guard/guest-guard.tsx';
export type { UseClerkThemeReturn, UseClerkThemeOptions } from './hooks/useClerkTheme.tsx'
export type { NavigateToSignInProps } from './navigate/NavigateToSignIn.tsx';
export type { NavigateToRecoveryProps } from './navigate/NavigateToRecovery.tsx';
export type { UseClerkSpecificThemeReturn } from './types.ts';
export type { AuthProviderProps } from './auth-provider/AuthProvider.tsx';
