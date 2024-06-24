"use client";
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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";

const connectAndPay = async (setTxns: any, address: string, amount: string) => {
  try {
    if (!window.ethereum) {
      throw new Error("No Crypto Wallet Fount, Please install it!");
    }
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(address);
    const txs = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(amount),
    });
    console.log(txs);
    setTxns(txs);
  } catch (err: any) {
    toast.error(err?.message);
  }
};

export default function Home() {
  const [txns, setTxns] = useState<any>();
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome To Bandit Wallet</CardTitle>
          <CardDescription>
            Enter your wallet address and amount you wants to transfer.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={({ target }) => setAddress(target.value)}
              type="text"
              placeholder="#....."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={({ target }) => setAmount(target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => connectAndPay(setTxns, address, amount)}>
            Send
          </Button>
        </CardFooter>
        {txns?.hash && (
          <div className="p-5 text-green-700 m-5 overflow-ellipsis">
            <h6 className="text-2xl text-green-800 mb-3">Transaction Successful 🎉</h6>
            <p className="break-words">{txns?.hash}</p>
          </div>
        )}
      </Card>
    </main>
  );
}
