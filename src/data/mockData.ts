import { Roadmap } from "@/components/RoadmapViewer";
import { DailyPlan } from "@/components/DailyPlanViewer";

export const mockRoadmaps: Record<string, Roadmap> = {
  fastapi: {
    topics: [
      {
        id: "1",
        name: "Introduction to FastAPI",
        subtopics: [
          { id: "1.1", name: "What is FastAPI?" },
          { id: "1.2", name: "Comparison with Flask/Django" },
          { id: "1.3", name: "FastAPI vs other frameworks" }
        ]
      },
      {
        id: "2",
        name: "Environment Setup",
        subtopics: [
          { id: "2.1", name: "Install FastAPI" },
          { id: "2.2", name: "Install Uvicorn" },
          { id: "2.3", name: "Run first app" }
        ]
      },
      {
        id: "3",
        name: "Basic API Development",
        subtopics: [
          { id: "3.1", name: "Creating endpoints" },
          { id: "3.2", name: "Path parameters" },
          { id: "3.3", name: "Query parameters" },
          { id: "3.4", name: "Request body" }
        ]
      },
      {
        id: "4",
        name: "Advanced Features",
        subtopics: [
          { id: "4.1", name: "Data validation with Pydantic" },
          { id: "4.2", name: "Authentication & Security" },
          { id: "4.3", name: "Database integration" },
          { id: "4.4", name: "Testing strategies" }
        ]
      }
    ]
  },
  react: {
    topics: [
      {
        id: "1",
        name: "React Fundamentals",
        subtopics: [
          { id: "1.1", name: "What is React?" },
          { id: "1.2", name: "JSX Syntax" },
          { id: "1.3", name: "Components and Props" }
        ]
      },
      {
        id: "2",
        name: "State Management",
        subtopics: [
          { id: "2.1", name: "useState Hook" },
          { id: "2.2", name: "useEffect Hook" },
          { id: "2.3", name: "Context API" }
        ]
      },
      {
        id: "3",
        name: "Advanced Patterns",
        subtopics: [
          { id: "3.1", name: "Custom Hooks" },
          { id: "3.2", name: "Performance Optimization" },
          { id: "3.3", name: "Error Boundaries" }
        ]
      }
    ]
  }
};

export const mockDailyPlans: Record<string, DailyPlan> = {
  fastapi: {
    plan: [
      {
        day: 1,
        topics: [
          {
            name: "Introduction to FastAPI",
            subtopics: [
              {
                name: "What is FastAPI?",
                prompt: "Explain FastAPI and its use cases in detail."
              },
              {
                name: "Comparison with Flask/Django",
                prompt: "Compare FastAPI with Flask and Django frameworks."
              }
            ]
          }
        ]
      },
      {
        day: 2,
        topics: [
          {
            name: "Environment Setup",
            subtopics: [
              {
                name: "Install FastAPI",
                prompt: "Show me how to install FastAPI and Uvicorn."
              },
              {
                name: "Run first app",
                prompt: "Create and run a simple 'Hello World' FastAPI application."
              }
            ]
          }
        ]
      },
      {
        day: 3,
        topics: [
          {
            name: "Basic API Development",
            subtopics: [
              {
                name: "Creating endpoints",
                prompt: "Learn how to create GET, POST, PUT, and DELETE endpoints in FastAPI."
              },
              {
                name: "Path parameters",
                prompt: "Understand how to use path parameters in FastAPI routes."
              }
            ]
          }
        ]
      }
    ]
  },
  react: {
    plan: [
      {
        day: 1,
        topics: [
          {
            name: "React Fundamentals",
            subtopics: [
              {
                name: "What is React?",
                prompt: "Explain React and its core concepts."
              },
              {
                name: "JSX Syntax",
                prompt: "Learn JSX syntax and how it differs from HTML."
              }
            ]
          }
        ]
      },
      {
        day: 2,
        topics: [
          {
            name: "State Management",
            subtopics: [
              {
                name: "useState Hook",
                prompt: "Learn how to manage component state with useState."
              }
            ]
          }
        ]
      }
    ]
  }
};

export const mockContent: Record<string, string> = {
  "What is FastAPI?": `
    <h2>FastAPI: Modern, Fast Web Framework</h2>
    <p>FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.</p>
    
    <h3>Key Features:</h3>
    <ul>
      <li><strong>Fast:</strong> Very high performance, on par with NodeJS and Go</li>
      <li><strong>Fast to code:</strong> Increase the speed to develop features by about 200% to 300%</li>
      <li><strong>Fewer bugs:</strong> Reduce about 40% of human (developer) induced errors</li>
      <li><strong>Intuitive:</strong> Great editor support with auto-completion</li>
      <li><strong>Easy:</strong> Designed to be easy to use and learn</li>
    </ul>

    <h3>Why Choose FastAPI?</h3>
    <p>FastAPI combines the best of modern Python features:</p>
    <ul>
      <li>Automatic request validation</li>
      <li>Automatic documentation generation</li>
      <li>Built-in OAuth2 support</li>
      <li>Async/await support</li>
    </ul>

    <h3>Code Example:</h3>
    <pre><code>from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}</code></pre>
  `,
  "Install FastAPI": `
    <h2>Installing FastAPI</h2>
    <p>Setting up FastAPI is straightforward. You'll need Python 3.7+ installed on your system.</p>

    <h3>Step 1: Create a Virtual Environment</h3>
    <pre><code># Create virtual environment
python -m venv fastapi-env

# Activate it (Windows)
fastapi-env\\Scripts\\activate

# Activate it (macOS/Linux)
source fastapi-env/bin/activate</code></pre>

    <h3>Step 2: Install FastAPI</h3>
    <pre><code># Install FastAPI
pip install fastapi

# Install ASGI server (Uvicorn)
pip install "uvicorn[standard]"</code></pre>

    <h3>Step 3: Verify Installation</h3>
    <pre><code># Check FastAPI version
pip show fastapi</code></pre>

    <h3>Alternative: Install All Dependencies</h3>
    <pre><code># Install with all optional dependencies
pip install "fastapi[all]"</code></pre>

    <p>This includes uvicorn, pydantic email validation, and other useful packages.</p>
  `,
  "What is React?": `
    <h2>React: A JavaScript Library for Building User Interfaces</h2>
    <p>React is a declarative, efficient, and flexible JavaScript library for building user interfaces, particularly web applications.</p>

    <h3>Core Concepts:</h3>
    <ul>
      <li><strong>Components:</strong> Reusable pieces of UI</li>
      <li><strong>Virtual DOM:</strong> Efficient rendering mechanism</li>
      <li><strong>JSX:</strong> Syntax extension for JavaScript</li>
      <li><strong>State:</strong> Component data that can change</li>
      <li><strong>Props:</strong> Data passed between components</li>
    </ul>

    <h3>Why React?</h3>
    <ul>
      <li>Component-based architecture</li>
      <li>Reusable code</li>
      <li>Large ecosystem and community</li>
      <li>Backed by Meta (Facebook)</li>
      <li>Excellent developer tools</li>
    </ul>

    <h3>Simple Example:</h3>
    <pre><code>function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}

function App() {
  return (
    &lt;div&gt;
      &lt;Welcome name="Sara" /&gt;
      &lt;Welcome name="Cahal" /&gt;
    &lt;/div&gt;
  );
}</code></pre>
  `
};

export const getRoadmapForTopic = (topic: string): Roadmap => {
  const normalizedTopic = topic.toLowerCase();
  
  if (normalizedTopic.includes('fastapi')) {
    return mockRoadmaps.fastapi;
  } else if (normalizedTopic.includes('react')) {
    return mockRoadmaps.react;
  }
  
  // Default fallback
  return {
    topics: [
      {
        id: "1",
        name: `Introduction to ${topic}`,
        subtopics: [
          { id: "1.1", name: `What is ${topic}?` },
          { id: "1.2", name: `${topic} fundamentals` }
        ]
      },
      {
        id: "2",
        name: "Getting Started",
        subtopics: [
          { id: "2.1", name: "Setup and installation" },
          { id: "2.2", name: "First example" }
        ]
      }
    ]
  };
};

export const getDailyPlanForTopic = (topic: string): DailyPlan => {
  const normalizedTopic = topic.toLowerCase();
  
  if (normalizedTopic.includes('fastapi')) {
    return mockDailyPlans.fastapi;
  } else if (normalizedTopic.includes('react')) {
    return mockDailyPlans.react;
  }
  
  // Default fallback
  return {
    plan: [
      {
        day: 1,
        topics: [
          {
            name: `Introduction to ${topic}`,
            subtopics: [
              {
                name: `What is ${topic}?`,
                prompt: `Explain ${topic} and its core concepts.`
              }
            ]
          }
        ]
      }
    ]
  };
};

export const getContentForSubtopic = (subtopicName: string): string => {
  return mockContent[subtopicName] || `
    <h2>${subtopicName}</h2>
    <p>This is mock content for learning about <strong>${subtopicName}</strong>.</p>
    <h3>Key Points:</h3>
    <ul>
      <li>Understanding the basics</li>
      <li>Practical applications</li>
      <li>Best practices</li>
      <li>Common pitfalls to avoid</li>
    </ul>
    <p>Continue practicing and building projects to master this concept!</p>
  `;
};