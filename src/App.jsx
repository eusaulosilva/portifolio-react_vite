
import Navbar from './components/Navbar'
import About from './pages/About'
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <footer className="rodape">
        <p>&copy; 2026 - Saulo Silva</p>
      </footer>
    </div>
  )
}

export default App
