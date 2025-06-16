import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to read subscription plans data
function getSubscriptionPlans() {
  const filePath = path.join(process.cwd(), 'data', 'subscription_plans.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// GET endpoint to retrieve all subscription plans
export async function GET() {
  try {
    const plans = getSubscriptionPlans();
    return NextResponse.json(plans, { status: 200 });
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription plans' },
      { status: 500 }
    );
  }
}
