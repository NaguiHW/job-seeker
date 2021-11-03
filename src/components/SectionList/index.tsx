import './index.scss';

const SectionList = (
  {
    title,
    icon,
    list,
  } : {
    title: string;
    icon: any;
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
  </section>
);

export default SectionList;
