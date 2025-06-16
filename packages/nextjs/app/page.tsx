"use client";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useState } from "react";

export default function Home() {
  const { address } = useAccount();
  const [priceInput, setPriceInput] = useState("");

  const { writeContractAsync: mintNFT } = useScaffoldWriteContract("SimpleNFT");
  const { writeContractAsync: listNFT } = useScaffoldWriteContract("SimpleNFT");
  const { writeContractAsync: buyNFT } = useScaffoldWriteContract("SimpleNFT");

  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "SimpleNFT",
    functionName: "totalSupply",
  });

  const { data: owner } = useScaffoldReadContract({
    contractName: "SimpleNFT",
    functionName: "owner",
  });

  const tokens = Array.from({ length: Number(totalSupply || 0) }, (_, i) => i);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🖼 NFT Магазин</h1>

      {address === owner && (
        <button
          onClick={() => mintNFT({ functionName: "safeMint", args: [address] })}
          className="btn btn-primary mb-4"
        >
          Mint NFT
        </button>
      )}

      <div className="grid grid-cols-1 gap-4">
        {tokens.map(tokenId => (
          <NFTCard key={tokenId} tokenId={tokenId} myAddress={address} listNFT={listNFT} buyNFT={buyNFT} priceInput={priceInput} setPriceInput={setPriceInput} />
        ))}
      </div>
    </div>
  );
}

function NFTCard({ tokenId, myAddress, listNFT, buyNFT, priceInput, setPriceInput }: any) {
  const { data: ownerOf } = useScaffoldReadContract({
    contractName: "SimpleNFT",
    functionName: "ownerOf",
    args: [tokenId],
  });

  const { data: price } = useScaffoldReadContract({
    contractName: "SimpleNFT",
    functionName: "listings",
    args: [tokenId],
  });

  return (
    <div className="border p-4 rounded">
      <p className="font-bold">NFT #{tokenId}</p>
      <p>Владелец: {ownerOf}</p>
      <p>Цена: {price ? `${price} wei` : "не продаётся"}</p>

      {ownerOf === myAddress && !price && (
        <div className="mt-2">
          <input
            type="text"
            value={priceInput}
            onChange={e => setPriceInput(e.target.value)}
            placeholder="Введите цену в wei"
            className="input input-bordered w-full mb-2"
          />
          <button
            className="btn btn-warning w-full"
            onClick={() => listNFT({ functionName: "listItem", args: [tokenId, BigInt(priceInput)] })}
          >
            Выставить на продажу
          </button>
        </div>
      )}

      {price && ownerOf !== myAddress && (
        <button
          className="btn btn-success mt-2 w-full"
          onClick={() => buyNFT({ functionName: "buyItem", args: [tokenId], value: price })}
        >
          Купить
        </button>
      )}
    </div>
  );
}