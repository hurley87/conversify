import React from 'react';
import Page from '../Page/Page';

const content = `
#### Terms
By accessing the website at https://conversify.ai, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
#### Use License
Permission is granted to temporarily download one copy of the materials (information or software) on Conversify's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
modify or copy the materials;
use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
attempt to decompile or reverse engineer any software contained on Conversify's website;
remove any copyright or other proprietary notations from the materials; or
transfer the materials to another person or "mirror" the materials on any other server.
This license shall automatically terminate if you violate any of these restrictions and may be terminated by Conversify at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
#### Disclaimer
The materials on Conversify's website are provided on an 'as is' basis. Conversify makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
Further, Conversify does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
#### Limitations
In no event shall Conversify or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Conversify's website, even if Conversify or a Conversify authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
#### Accuracy of materials
The materials appearing on Conversify's website could include technical, typographical, or photographic errors. Conversify does not warrant that any of the materials on its website are accurate, complete or current. Conversify may make changes to the materials contained on its website at any time without notice. However Conversify does not make any commitment to update the materials.
#### Links
Conversify has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Conversify of the site. Use of any such linked website is at the user's own risk.
#### Modifications
Conversify may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
#### Governing Law
These terms and conditions are governed by and construed in accordance with the laws of Illinois and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
`;

const Terms = () => (
  <div className="Terms">
    <Page
      title="Terms of Service"
      subtitle="Last updated July 1st, 2019"
      content={content}
    />
  </div>
);

export default Terms;
