// import { signIn } from '@/auth';
import { Button } from '../ui/button';

import { FcGoogle } from 'react-icons/fc';

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        // await signIn('google');
      }}
    >
      <Button
        className="cursor-pointer h-2x p-2 m-2 rounded-none"
        type="submit"
      >
        Google
        <FcGoogle />
      </Button>
    </form>
  );
}
