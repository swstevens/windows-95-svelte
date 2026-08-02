<script lang="ts">
    import '../styles/theme.css';

    // Props interface
    interface Props {
      // Add any props you might need
    }
    let {}: Props = $props();
  </script>

  <div class="themed-page experience-page">
    <div class="themed-page-content">
      <h2>Experience</h2>

      <div class="themed-card experience-item">
        <h3>SIGGRAPH 2026</h3>
        <p class="date">Los Angeles, 07/26</p>
        <p>
          Served as a Student Volunteer at SIGGRAPH 2026, supporting conference operations including attendee assistance, talk facilitation, and author/poster support. Engaged directly with cutting-edge computer vision and computer graphics research, complementing graduate studies in AI and Data Science.
        </p>
      </div>

      <div class="themed-card experience-item">
        <h3>UHA HEALTH INSURANCE</h3>
        <p class="date">Honolulu, 02/26-Present</p>
        <p>
          Working as a Software Engineer (starting as an intern before converting to full-time), iteratively optimizing internal data workflows and tooling. Took a recurring Risk team query from hours down to seconds by rewriting SQL Server views and stored procedures and building a Snowflake data lake with Python/Parquet ingestion. Automated daily operational tasks and recurring data aggregation via SQL stored procedures, and is piloting a further migration to Airflow-orchestrated Python workflows.
        </p>
        <p>
          Built the frontend (Alpine.js) and backend queries for a newly built X12 automation tool that applies business rules to auto-route file approvals. Identified legacy design patterns limiting maintainability and partnered with the lead engineer to redesign the system using Onion Architecture and .NET.
        </p>
      </div>

      <div class="themed-card experience-item">
        <h3>UNIVERSITY OF HAWAII AT MANOA</h3>
        <p class="date">Honolulu, 08/24-Present</p>
        <p>
          Pursuing a Master's degree in Computer Science with a focus on AI and Data Science, concentrating coursework in graphics programming, machine learning, and computer vision. Engaging in graduate-level coursework covering advanced algorithms, distributed systems, and the mathematical foundations behind modern rendering and vision pipelines.
        </p>
        <p>
          Developing expertise in modern AI architectures including agentic systems, retrieval-augmented generation (RAG), and context-aware generation techniques, while building practical graphics and computer vision applications that demonstrate advanced software engineering principles and autonomous agent coordination.
        </p>
      </div>

      <div class="themed-card experience-item">
        <h3>VINDICIA</h3>
        <p class="date">San Francisco, 03/22-12/23</p>
        <p>
          As a full stack developer, developed frontend features leveraging React and backend microservices utilizing Python Flask, DynamoDB, and PostgreSQL to streamline and integrate processes, serving to drive seamless integration and iteration. Maintained and enhanced critical legacy billing system within Perl and PostgreSQL in alignment with modernization initiatives. Oversaw end-to-end projects from requirements gathering through the comprehensive software development life cycle of billing systems and transaction retention.
        </p>
        <p>
          Identified feature gap in service and designed new microservice to fit into current system design in Python/Flask to fill consumer needs, boosting user retention by 20%.
          Collaborated with cross-functional teams to create detailed specifications, user stories, and acceptance criteria in line with best practices to accelerate project release time by two release cycles.
          Built and improved Amazon S3 and DynamoDB storage system to store transaction information and batch logs.
          Proactively addressed improperly built API calls forecasted for release by rewriting logic and collaborating with senior engineers prior to code freeze, enabling new features to release on schedule while ensuring quality coding.
        </p>
      </div>
  
      <div class="themed-card experience-item">
        <h3>UO TECHDESK</h3>
        <p class="date">Eugene, 09/19-08/21</p>
        <p>
          Partnered with customers to effectively resolve technical and university account-related issues to optimize satisfaction and yield positive feedback. Worked closely with various internal teams using Microsoft Teams to effectively maintain an engaging culture. Performed in the top 5% of team members in customer assistance.
          Utilized Confluence to document internal records and highlight best practices on how to solve IT challenges, enabling active and future employees to accelerate resolutions beyond former capacity.
        </p>
      </div>
  
      <div class="themed-card experience-item">
        <h3>UO ESPORTS</h3>
        <p class="date">Eugene, 09/19-06/21</p>
        <p>
          Collaborated with up to 10 team members to schedule weekly practices and matches. Organized video reviews of practices and matches to improve communication, coordination, and cohesion between members.
        </p>
      </div>
    </div>
  </div>
  
  <style>
    /* Page-specific customizations */
    .experience-item {
      cursor: default;
    }

    .experience-item:hover {
      cursor: default;
      padding-left: 14px;
    }

    .date {
      font-style: italic;
      color: var(--secondary);
      font-size: 10px;
      margin-bottom: 8px;
      font-weight: 600;
    }
  </style>