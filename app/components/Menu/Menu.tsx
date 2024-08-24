import React from 'react'

interface MenuProps {
  showMenu: boolean;
  setShowInstructionsModal: (value: boolean) => void;
  setShowArchiveModal: (value: boolean) => void;
}

export default function Menu({ showMenu, setShowInstructionsModal, setShowArchiveModal }: MenuProps) {

  const setIncludeUrlInClipboard = (value: boolean) => {
    setIncludeUrl(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('includeUrl', JSON.stringify(value));
    }
  }
  
  const getIncludeUrlInClipboard = () => {
    if (typeof window !== 'undefined') {
      const includeUrl = localStorage.getItem('includeUrl');
      return includeUrl ? JSON.parse(includeUrl) : true;
    }
    return true;
  }

  const [includeUrl, setIncludeUrl] = React.useState(getIncludeUrlInClipboard());

  if (showMenu) {
    return (
      <section className="flex flex-col gap-5 items-center w-full content-center text-dark-maroon">
        <button className="py-2 px-4 bg-[#304d6d] text-white font-medium rounded-full hover:bg-[#82A0BC] w-3/4 mt-36" onClick={() => setShowInstructionsModal(true)}>How to Play</button>
        <button className="py-2 px-4 bg-[#304d6d] text-white font-medium rounded-full hover:bg-[#82A0BC] w-3/4" onClick={() => setShowArchiveModal(true)}>Archive</button>
        <div>
          <span className="text-s text-dark-maroon text-opacity-70">Include URL in clipboard</span>
          <input type="checkbox" className="ml-2" checked={includeUrl} onChange={(event) => setIncludeUrlInClipboard(event.target.checked)} />
        </div>
      </section>
    )
  } else {
    return null;
  }
}