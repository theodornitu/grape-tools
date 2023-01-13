export default function Footer(props: any) {
  if (props.footerLanding) {
    return (
      <footer className="relative z-50 py-8 text-slate-700 border">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full px-4 md:w-7/12">
              <div className="py-1 text-sm font-medium pl-6">
                <p className="mb-0 text-slate-700/60">
                  © {new Date().getFullYear()}
                  <a
                    href=""
                    className="text-decoration-underline ml-1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    grape tools
                  </a>
                  , all rights reserved. <br />
                  Made with
                  <i className="fas fa-heart ml-1" aria-hidden="true" /> for blockchain&nbsp;& artificial intelligence. <br />
                  Based on 
                  <a 
                    href="https://github.com/Elrond-Giants/giants-nftim-minting-dapp"
                    className="text-decoration-underline ml-1"
                    target="_blank"
                    rel="noreferrer"
                    >
                      Giants&nbsp;& NFTim Minting dApp
                    </a>
                </p>
              </div>
            </div>
            <div className="w-full px-4 pr-6 md:w-5/12 mt-5 lg:mt-0 text-end">
              <h5 className="block antialiased tracking-normal font-sans text-inherit mt-0 mb-2 text-lg font-normal opacity-60">
                A non-fungible token is a financial security consisting of digital data stored in a blockchain, a form
                of distributed ledger.
              </h5>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="pt-12 pb-6 mt-12">
      <div className="container">
        <div className="flex flex-wrap -mx-3">
          <div className="w-8/12 max-w-full px-3 mx-auto mt-1 text-center flex-0">
            <p className="mb-0 text-slate-400">
              © {new Date().getFullYear()}
              <a
                href="https://www.creative-tim.com/"
                className="text-decoration-underline ml-1"
                target="_blank"
                rel="noreferrer"
              >
                Creative Tim
              </a>
              &nbsp;&
              <a
                href="https://elrondgiants.com/"
                className="text-decoration-underline ml-1"
                target="_blank"
                rel="noreferrer"
              >
                Elrond Giants
              </a>
              , all rights reserved. Made with
              <i className="fas fa-heart ml-1" aria-hidden="true" /> for a better web.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
