import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginCard } from "./LoginCard";
import { SignupCard } from "./SignupCard";

export default function AuthForms() {
  return (
    <div className="w-fit mx-auto">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginCard />
        </TabsContent>
        <TabsContent value="signup">
          <SignupCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
