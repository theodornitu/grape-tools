export default function Footer(props: any) {
  if (props.footerLanding) {
    return (
      <footer className="relative z-50 py-8 text-slate-700 border">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full px-4 md:w-7/12">
              <div className="py-1 text-sm font-medium pl-6">
                <p className="mb-0 text-violet-600">
                  © {new Date().getFullYear()}
                  <span className="ml-1">
                    grape tools <br />
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full px-4 pr-6 md:w-5/12 mt-5 lg:mt-0 text-end">
            <p className="mb-0 text-slate-700/60">
                  Made with
                  <i className="fas fa-heart ml-1 text-violet-600" aria-hidden="true" /> for Blockchain&nbsp;& Artificial Intelligence. <br />
                  <a 
                    href="https://github.com/Elrond-Giants/giants-nftim-minting-dapp"
                    className="text-decoration-underline text-2.5"
                    target="_blank"
                    rel="noreferrer"
                    >
                      Based on Giants&nbsp;& NFTim Minting Dapp
                    </a>
                </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="pt-12 pb-6 mt-12">
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
                    grape tools <br />
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full px-4 pr-6 md:w-5/12 mt-5 lg:mt-0 text-end">
            <p className="mb-0 text-slate-700/60">
                  Made with
                  <i className="fas fa-heart ml-1" aria-hidden="true" /> for blockchain&nbsp;& AI. <br />
                  <a 
                    href="https://github.com/Elrond-Giants/giants-nftim-minting-dapp"
                    className="text-decoration-underline text-2.5"
                    target="_blank"
                    rel="noreferrer"
                    >
                      Based on Giants&nbsp;& NFTim Minting dApp
                    </a>
                </p>
            </div>
          </div>
        </div>
    </footer>
  );
}
