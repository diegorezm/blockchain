import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function ColorschemeShowcase() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4 gap-6">
      <Input type="text" placeholder="email@mail.com" />
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
