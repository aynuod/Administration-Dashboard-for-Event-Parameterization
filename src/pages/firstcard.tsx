import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'A.admin@attijari.com' && password === 'admin') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Se connecter</CardTitle>
        <CardDescription>Connectez-vous pour accéder à la brique de fidélisation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <div className="grid gap-2 items-start space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@Attijari.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2 items-start space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleLogin}>
          Se connecter
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@radix-ui/react-label";

// function Login() {
//   return (
//     <>
//       <Card className="w-[350px]">
//         <CardHeader>
//           <CardTitle>Connexion</CardTitle>
//           <CardDescription>
//             Vous êtes dans la brique de fidélisation. Veuillez vous connecter pour accéder à l'interface admin.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid w-full gap-4">
//             <div className="grid gap-2 items-start space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" placeholder="m@example.com" />
//             </div>
//             <div className="grid gap-2 items-start space-y-2">
//               <Label htmlFor="password">Mot de passe</Label>
//               <Input id="password" type="password" placeholder="******" />
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button className="w-full">Se connecter</Button>
//         </CardFooter>
//       </Card>
//     </>
//   );
// }

// export default Login;