import React, { SyntheticEvent } from 'react'
import PortfolioDelete from '../DeletePortfolio/PortfolioDelete';

interface Props {
    portfolioValue: string;
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const PortfolioCard = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
        <p className="pt-6 text-xl font-bold">{portfolioValue}</p>
        <PortfolioDelete onPortfolioDelete={onPortfolioDelete} portfolioValue={portfolioValue} />
    </div>
  )
}

export default PortfolioCard;