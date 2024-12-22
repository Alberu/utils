import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const WillYou = () => {
  const [rejections, setRejections] = useState(0);
  const [yes, setYes] = useState(false);

  const noText = [
    "No",
    'Are you sure',
    'Are you really sure? 🥺',
    '💔',
    'Are you positive????',
    'If you say no I will be very sad',
    'If you say no I will be very very sad',
    'Okay... I give up, you can say no',
    'Just kidding just say yes',
];
  return (
    <PageLayout>
      <Card className="container max-w-lg">
        <CardHeader>{/* <CardTitle>Hi</CardTitle> */}</CardHeader>
        <CardContent className="text-center">
          <p>Will you be my valentine?</p>
          <p className="grid-cols-2 text-center">
            <button
              className="p-5"
              style={{ fontSize: `${8 * 2 ** (rejections + 1)}px` }}
            >
              Yes
            </button>
            {rejections < 4 && (
              <button
                className="p-5"
                onClick={() => {
                  setRejections((prevValue) => prevValue + 1);
                }}
              >
                {noText[rejections]}
              </button>
            )}
          </p>
          <p>Rejections: {rejections}</p>
        </CardContent>
      </Card>
      <a href="https://www.instagram.com/reel/C24CAVouAAZ/?igsh=NzlnOGQzY21kcTBl">
        Inspiratoin
      </a>
    </PageLayout>
  );
};

export default WillYou;
