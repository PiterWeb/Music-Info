import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import CustomRoutes from './routes/CustomRoutes'
import Navbar from './components/Navbar/Navbar'
import './index.css'
import { RecoilRoot } from 'recoil'


render(
  <StrictMode>
    <RecoilRoot>
    <BrowserRouter>
      <Navbar />
      <div className="window">
        <CustomRoutes />
      </div>
    </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
  
  ,
  document.getElementById('root')
)
