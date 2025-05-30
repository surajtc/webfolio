import { Mail, Eye, Facebook, Apple } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Left column - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <span className="w-6 h-6 bg-primary rounded-sm" />
            InsideBox
          </div>

          {/* Headings */}
          <div>
            <h2 className="text-2xl font-semibold">Start your journey</h2>
            <p className="text-muted-foreground text-sm">
              Get access to InsideBox
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="example@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer" />
                  <Input id="password" type="password" placeholder="********" />
                </div>
              </div>

              <Button className="w-full mt-4">Sign up</Button>
            </CardContent>
          </Card>

          {/* Divider */}
          <div className="text-center text-sm text-muted-foreground">
            or sign up with
          </div>

          {/* Social buttons */}
          <div className="flex gap-4 justify-center">
            <Button variant="outline" size="icon">
              <Facebook className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Mail className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Apple className="w-5 h-5" />
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            Have an account?
            <a href="#" className="text-chart-1 underline">
              Sign in
            </a>
          </div>
        </div>
      </div>

      {/* Right column - image */}
      <div
        className="hidden bg-muted lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url("/login-art.jpg")`,
        }}
      />
    </div>
  );
}
