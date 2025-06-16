import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the JSON file
const dataFilePath = path.join(process.cwd(), 'data', 'subscription_plans.json');

// Helper function to read the JSON file
function readDataFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscription plans data:', error);
    return [];
  }
}

// Helper function to write to the JSON file
function writeDataFile(data: any) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing subscription plans data:', error);
    return false;
  }
}

// GET handler to list all subscription plans
export async function GET() {
  try {
    const plans = readDataFile();
    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription plans' },
      { status: 500 }
    );
  }
}

// POST handler to create a new subscription plan
export async function POST(request: NextRequest) {
  try {
    const plans = readDataFile();
    const newPlan = await request.json();
    
    // Generate a new ID (simple implementation)
    const maxId = plans.reduce(
      (max: number, plan: any) => Math.max(max, parseInt(plan.id) || 0),
      0
    );
    
    const planWithId = {
      id: (maxId + 1).toString(),
      ...newPlan
    };
    
    plans.push(planWithId);
    
    if (writeDataFile(plans)) {
      return NextResponse.json(planWithId, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to save subscription plan' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription plan' },
      { status: 500 }
    );
  }
}
