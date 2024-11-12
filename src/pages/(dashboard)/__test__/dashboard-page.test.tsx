// StatsCard.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { StatsCard, OrdersCard, OrdersInProgressCard, CardComponent } from '../dashboard-page';

it('renders StatsCard component correctly', () => {
  const title = 'Total Orders';
  const value = 100;
  const icon = <div>Cart Icon</div>;
  const footer = <div>Footer content</div>;

  render(<StatsCard title={title} value={value} icon={icon} footer={footer} />);

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(value.toString())).toBeInTheDocument();
  expect(screen.getByText('Cart Icon')).toBeInTheDocument();
  expect(screen.getByText('Footer content')).toBeInTheDocument();
});


it('renders OrdersCard component correctly', () => {
  render(<OrdersCard />);

  expect(screen.getByText('Orders Completed')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
  expect(screen.getByText('ML Models')).toBeInTheDocument();
  expect(screen.getByText('On Demand Requests')).toBeInTheDocument();
});


it('renders and interacts with the OrdersInProgressCard component', () => {
  render(<OrdersInProgressCard />);

  expect(screen.getByText('AutoSync Project')).toBeInTheDocument();

  const button = screen.getByText('View All');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
});

it('renders CardComponent with a line chart', () => {
  const data = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Dataset',
        data: [10, 20, 30],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
      },
    ],
  };

  const title = 'Monthly Revenue';
  const value = '$1000';
  const subtitle = 'This month';
  const footerTitle = 'Last month';
  const footerValue = '$950';

  render(
    <CardComponent
      title={title}
      value={value}
      subtitle={subtitle}
      footerTitle={footerTitle}
      footerValue={footerValue}
      data={data}
    />
  );

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(value)).toBeInTheDocument();
  expect(screen.getByText(subtitle)).toBeInTheDocument();
  expect(screen.getByText(footerTitle)).toBeInTheDocument();
  expect(screen.getByText(footerValue)).toBeInTheDocument();
  expect(screen.getByRole('img')).toBeInTheDocument();
});
