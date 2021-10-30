import './index.scss';

const Section = (
  {
    title,
    icon,
    type,
    content,
    list,
  } : {
    title: string;
    icon: any;
    type: string;
    content?: string;
    list?: {
      master: [],
      expert: [],
      proficient: [],
    },
  }
) => (
  <section className="section">
    <div className="title">
      {icon}
      <h3>{title}</h3>
    </div>
    {
      type === 'info' ? <p>{content}</p> : (
        <>
          <div className="list">
            <h3>Master</h3>
            <ul>
              {
                list?.master.map((str: any) => (
                  <li>{str.name}</li>
                  ))
                }
            </ul>
          </div>
          <div className="list">
            <h3>Expert</h3>
            <ul>
              {
                list?.expert.map((str: any) => (
                  <li>{str.name}</li>
                  ))
                }
            </ul>
          </div>
          <div className="list">
            <h3>Proficient</h3>
            <ul>
              {
                list?.proficient.map((str: any) => (
                  <li>{str.name}</li>
                  ))
                }
            </ul>
          </div>
        </>
      )
    }
  </section>
);

export default Section;
