import React from 'react'

const Header = () => {
  return (
    <header className="bg-gray-900">
  <nav className="container mx-auto px-4 py-3 lg:flex lg:items-center lg:justify-between">
    <div className="flex items-center justify-between">
      <a href="/" className="text-white text-lg font-semibold">
        Crud Application
      </a>
      <button
        className="lg:hidden text-white focus:outline-none focus:text-white"
        type="button"
        data-toggle="collapse"
        data-target="#basic-navbar-nav"
        aria-controls="basic-navbar-nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </div>
    <div className="flex items-center justify-between">
        <button className='text-white p-3 '>Login</button>
        <button className='text-white p-3 m-3'>Signup</button>
    </div>
    {/* <div className="hidden lg:flex lg:flex-grow lg:items-center">
      <ul className="lg:flex lg:ml-auto space-y-4 lg:space-y-0 lg:space-x-4">
        {userInfo ? (
          <li className="relative group">
            <button className="text-white">
              {userInfo.name}
            </button>
            <ul className="absolute hidden group-hover:block right-0 mt-2 py-2 bg-gray-800 border border-gray-700 rounded">
              <li>
                <a href="/profile" className="block px-4 py-2 text-white">
                  Profile
                </a>
              </li>
              <li>
                <button className="block px-4 py-2 text-white w-full text-left">
                  Logout
                </button>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li>
              <a href="/login" className="text-white flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Sign In
              </a>
            </li>
            <li>
              <a href="/register" className="text-white flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Sign Up
                <p>Sign up</p>
              </a>
            </li>
          </>
        )}
      </ul>
    </div> */}
  </nav>
</header>

  )
}

export default Header