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

// GET handler to fetch a single subscription plan by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const plans = readDataFile();
    const plan = plans.find((p: any) => p.id === params.id);

    if (!plan) {
      return NextResponse.json(
        { error: 'Subscription plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error fetching subscription plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription plan' },
      { status: 500 }
    );
  }
}

// PUT handler to update a subscription plan by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const plans = readDataFile();
    const planIndex = plans.findIndex((p: any) => p.id === params.id);

    if (planIndex === -1) {
      return NextResponse.json(
        { error: 'Subscription plan not found' },
        { status: 404 }
      );
    }

    const updatedPlan = await request.json();
    plans[planIndex] = {
      ...updatedPlan,
      id: params.id // Ensure ID doesn't change
    };

    if (writeDataFile(plans)) {
      return NextResponse.json(plans[planIndex]);
    } else {
      return NextResponse.json(
        { error: 'Failed to update subscription plan' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription plan' },
      { status: 500 }
    );
  }
}

// DELETE handler to remove a subscription plan by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const plans = readDataFile();
    const planIndex = plans.findIndex((p: any) => p.id === params.id);

    if (planIndex === -1) {
      return NextResponse.json(
        { error: 'Subscription plan not found' },
        { status: 404 }
      );
    }

    const deletedPlan = plans[planIndex];
    plans.splice(planIndex, 1);

    if (writeDataFile(plans)) {
      return NextResponse.json(deletedPlan);
    } else {
      return NextResponse.json(
        { error: 'Failed to delete subscription plan' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting subscription plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete subscription plan' },
      { status: 500 }
    );
  }
}
