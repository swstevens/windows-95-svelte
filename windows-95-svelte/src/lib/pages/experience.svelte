<script lang="ts">
    // Props interface
    interface Props {
      // Add any props you might need
    }
    let {}: Props = $props();
  </script>
  
  <div class="page experience-page">
    <div class="page-content">
      <h2>Experience</h2>
      
      <div class="experience-item">
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
  
      <div class="experience-item">
        <h3>UO TECHDESK</h3>
        <p class="date">Eugene, 09/19-08/21</p>
        <p>
          Partnered with customers to effectively resolve technical and university account-related issues to optimize satisfaction and yield positive feedback. Worked closely with various internal teams using Microsoft Teams to effectively maintain an engaging culture. Performed in the top 5% of team members in customer assistance.
          Utilized Confluence to document internal records and highlight best practices on how to solve IT challenges, enabling active and future employees to accelerate resolutions beyond former capacity.
        </p>
      </div>
  
      <div class="experience-item">
        <h3>UO ESPORTS</h3>
        <p class="date">Eugene, 09/19-06/21</p>
        <p>
          Collaborated with up to 10 team members to schedule weekly practices and matches. Organized video reviews of practices and matches to improve communication, coordination, and cohesion between members.
        </p>
      </div>
    </div>
  </div>
  
  <style>
    .page {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 8px;
    }
  
    .page-content {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
    }
  
    h2 {
      margin: 0 0 16px 0;
      color: #000;
      font-family: 'MS Sans Serif', sans-serif;
      font-size: 14px;
      font-weight: bold;
    }
  
    h3 {
      margin: 0 0 8px 0;
      color: #000;
      font-family: 'MS Sans Serif', sans-serif;
      font-size: 12px;
      font-weight: bold;
    }
  
    p {
      margin: 0 0 8px 0;
      font-size: 11px;
      line-height: 1.4;
    }
  
    .experience-item {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid #d0d0d0;
    }
  
    .experience-item:last-child {
      border-bottom: none;
    }
  
    .date {
      font-style: italic;
      color: #606060;
    }
  </style>