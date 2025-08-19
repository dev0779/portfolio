import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const MyCard = ({ title, description, children }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardAction>Card Action</CardAction>
    </CardHeader>
    <CardContent>{children}</CardContent>
    <CardFooter>
      <p>Im a footer</p>
    </CardFooter>
  </Card>
);
