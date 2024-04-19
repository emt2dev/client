import React, { SyntheticEvent } from 'react'

interface Props {
    symbol: string;
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const AddPortfolio = ({symbol, onPortfolioCreate}: Props) => {
  return (
    <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
        <form onSubmit={onPortfolioCreate}>
            <input readOnly={true} hidden value={symbol}/>
            <button className="p-2 px-8 text-white bg-darkBlue rounded-lg hover:opacity-70 focus:outline-none" type="submit">Add</button>
        </form>
    </div>
  )
}

export default AddPortfolio;