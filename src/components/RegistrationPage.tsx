import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { getErrors } from "@/utils/validation";

interface RegistrationPageProps {
  onGoLogin?: () => void;
}

export function RegistrationPage({ onGoLogin }: RegistrationPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = getErrors({ firstName, lastName, password, email, mobile, address });
    setErrors(validation as Record<string, string>);
    if (Object.keys(validation).length === 0) {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, email, password, mobile, address })
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setSubmitted(true);
          // Redirect to dashboard or call onLogin
          window.location.reload();
        } else {
          setErrors({ submit: data.error });
        }
      } catch (error) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    } else {
      setSubmitted(false);
    }
  };

  const fieldError = (name: string) => errors[name];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <Card className="w-full max-w-xl bg-card/50 backdrop-blur-xl border-border/50">
        <CardHeader>
          <CardTitle>Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                {fieldError('firstName') && <p className="text-red-400 text-sm">{fieldError('firstName')}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                {fieldError('lastName') && <p className="text-red-400 text-sm">{fieldError('lastName')}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {fieldError('email') && <p className="text-red-400 text-sm">{fieldError('email')}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {fieldError('password') && <p className="text-red-400 text-sm">{fieldError('password')}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile (10 digits)</Label>
              <Input id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
              {fieldError('mobile') && <p className="text-red-400 text-sm">{fieldError('mobile')}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
              {fieldError('address') && <p className="text-red-400 text-sm">{fieldError('address')}</p>}
            </div>

            <Button type="submit" className="w-full">Submit</Button>
            {submitted && <p className="text-green-400 text-sm">Registration successful! Redirecting...</p>}
            {errors.submit && <p className="text-red-400 text-sm">{errors.submit}</p>}
            <div className="text-center mt-2">
              <p className="text-muted-foreground">Already have an account?{' '}
                <button type="button" onClick={onGoLogin} className="text-primary underline">Sign in</button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
